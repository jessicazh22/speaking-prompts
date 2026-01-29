import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@^2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface FeedbackRequest {
  session_id: string;
  prompt: {
    id: string;
    title: string;
    question: string;
    difficulty_level: string;
    grammar_focus_areas: string[];
    vocabulary_focus: string[];
  };
  audio_url: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const body: FeedbackRequest = await req.json();
    const { session_id, prompt, audio_url } = body;

    // Fetch audio file
    const audioResponse = await fetch(audio_url);
    if (!audioResponse.ok) {
      throw new Error("Failed to fetch audio file");
    }
    const audioBlob = await audioResponse.blob();
    const audioBuffer = await audioBlob.arrayBuffer();
    const audioBase64 = btoa(String.fromCharCode(...new Uint8Array(audioBuffer)));

    // Send to Claude for analysis
    const claudeResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": Deno.env.get("ANTHROPIC_API_KEY") || "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 2000,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `You are an experienced English language teacher specializing in IELTS speaking assessment.

A student has recorded a speaking response to the following prompt:
Prompt: "${prompt.question}"
Difficulty Level: ${prompt.difficulty_level}
Grammar Focus Areas: ${prompt.grammar_focus_areas.join(", ")}
Vocabulary Focus: ${prompt.vocabulary_focus.join(", ")}

Please analyze the student's response in the following categories and provide constructive feedback:

1. GRAMMAR_ANALYSIS: Evaluate their use of grammar structures (correct tenses, subject-verb agreement, complex sentences). Note any errors and improvements needed. Focus on the grammar areas mentioned above.

2. VOCABULARY_ANALYSIS: Assess their vocabulary range and appropriateness. Identify strong vocabulary use and suggest more advanced alternatives where applicable. Focus on the vocabulary areas mentioned above.

3. FLUENCY_ANALYSIS: Comment on their delivery, pacing, coherence, and natural flow of speech. Note any hesitations or filler words.

4. CONTENT_RELEVANCE_ANALYSIS: Evaluate how well they addressed the prompt, the relevance of their examples, and the depth of their response.

5. SENTENCE_STRUCTURE_ANALYSIS: Analyze their ability to construct complex sentences and vary sentence types.

Also provide:
- OVERALL_SCORE: Rate their performance from 1-10 (10 being excellent)
- DETAILED_FEEDBACK: A brief summary of their overall performance with the most important areas to focus on

Format your response as a JSON object with these exact keys: grammar_analysis, vocabulary_analysis, fluency_analysis, content_relevance_analysis, sentence_structure_analysis, overall_score (number), detailed_feedback.`,
              },
              {
                type: "image",
                source: {
                  type: "base64",
                  media_type: "audio/webm",
                  data: audioBase64,
                },
              },
            ],
          },
        ],
      }),
    });

    if (!claudeResponse.ok) {
      const error = await claudeResponse.text();
      console.error("Claude API error:", error);
      throw new Error("Failed to get feedback from Claude API");
    }

    const claudeData = await claudeResponse.json();

    // Parse Claude's response
    let feedbackData;
    try {
      const responseText =
        claudeData.content[0].type === "text" ? claudeData.content[0].text : "";

      // Extract JSON from the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No JSON found in Claude response");
      }

      feedbackData = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error("Failed to parse Claude response:", parseError);
      // Fallback feedback structure if parsing fails
      feedbackData = {
        grammar_analysis:
          "Unable to analyze grammar at this time. Please try again.",
        vocabulary_analysis:
          "Unable to analyze vocabulary at this time. Please try again.",
        fluency_analysis:
          "Unable to analyze fluency at this time. Please try again.",
        content_relevance_analysis:
          "Unable to analyze content at this time. Please try again.",
        sentence_structure_analysis:
          "Unable to analyze sentence structure at this time. Please try again.",
        overall_score: 0,
        detailed_feedback:
          "There was an issue processing your audio. Please try again.",
      };
    }

    // Save feedback to database
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    );

    const { data: savedFeedback, error: dbError } = await supabase
      .from("feedback")
      .insert({
        session_id,
        grammar_analysis: feedbackData.grammar_analysis,
        vocabulary_analysis: feedbackData.vocabulary_analysis,
        fluency_analysis: feedbackData.fluency_analysis,
        content_relevance_analysis: feedbackData.content_relevance_analysis,
        sentence_structure_analysis: feedbackData.sentence_structure_analysis,
        overall_score: feedbackData.overall_score,
        detailed_feedback: feedbackData.detailed_feedback,
      })
      .select()
      .maybeSingle();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to save feedback to database");
    }

    return new Response(
      JSON.stringify({ success: true, feedback: savedFeedback }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
