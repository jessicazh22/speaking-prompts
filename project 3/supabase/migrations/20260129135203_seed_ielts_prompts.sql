/*
  # Seed IELTS Speaking Prompts

  1. Content
    - 24 IELTS-style speaking prompts across 6 categories
    - Covering difficulty levels A2 to C1
    - Each prompt includes grammar focus areas, vocabulary focus, and helpful tips
    - Tips are formatted as a series of reminders to help students during practice

  2. Categories
    - Hometown & Places
    - Art & Culture
    - Technology
    - Daily Life & Hobbies
    - People & Relationships
    - Experiences & Memories
*/

INSERT INTO prompts (title, question, difficulty_level, category, grammar_focus_areas, vocabulary_focus, tips) VALUES

-- Hometown & Places (6 prompts)
('Your Hometown', 'Tell me about your hometown. Where is it? What is it like? What do you like about it?', 'A2', 'Hometown & Places', ARRAY['Present tense', 'Adjectives', 'Prepositions of place'], ARRAY['Location words', 'Descriptive adjectives', 'Weather terms'], 'Tips: Use present simple tense. Describe size, location, and main features. Use adjectives like "beautiful", "busy", "peaceful". Start with "My hometown is..." and follow with specific examples.'),

('A Place You''d Like to Visit', 'Describe a place you would like to visit someday. Where is it? Why would you like to go there? What would you do there?', 'B1', 'Hometown & Places', ARRAY['Conditional statements (would)', 'Present perfect', 'Because/so conjunctions'], ARRAY['Travel vocabulary', 'Attraction words', 'Activity verbs'], 'Tips: Use "would like to..." and "would go..." structures. Explain reasons clearly. Mention specific activities or attractions. Use transition words like "because", "since", "moreover".'),

('A Park or Garden', 'Describe a park or garden you know. What is it like? What facilities does it have? How often do you visit?', 'B1', 'Hometown & Places', ARRAY['There is/are', 'Present simple', 'Frequency adverbs'], ARRAY['Park facilities', 'Nature vocabulary', 'Seasonal words'], 'Tips: Start with location and general description. List specific facilities and features. Use "there is/are" for descriptions. Include personal habits with frequency words: always, usually, sometimes.'),

('Your Favorite Neighborhood', 'Talk about your favorite neighborhood. Where is it located? What makes it special? What do people do there?', 'B2', 'Hometown & Places', ARRAY['Relative clauses', 'Present perfect continuous', 'Comparative adjectives'], ARRAY['Urban features', 'Community activities', 'Atmosphere words'], 'Tips: Use relative clauses to add detail ("which has...", "where people..."). Describe the atmosphere and community. Compare it to other areas. Use vivid adjectives.'),

('Accommodation You Remember', 'Describe an interesting place where you have stayed. Where was it? Why was it interesting? Would you like to go back?', 'B2', 'Hometown & Places', ARRAY['Past tense', 'Would/wouldn''t', 'Relative clauses'], ARRAY['Interior design vocabulary', 'Accommodation types', 'Memory words'], 'Tips: Mix past and conditional tenses. Use "I remember..." and "What I liked was...". Describe layout, atmosphere, and people. Explain why you''d return.'),

('An Old Building or Landmark', 'Tell me about an old building or landmark in your country. What is it? How long has it existed? Why is it important?', 'C1', 'Hometown & Places', ARRAY['Present perfect', 'Passive voice', 'Complex sentences'], ARRAY['Architecture terms', 'Historical vocabulary', 'Preservation words'], 'Tips: Provide historical context using present perfect. Use passive constructions ("it was built...", "is known as..."). Explain cultural or architectural significance. Use sophisticated vocabulary.'),

-- Art & Culture (4 prompts)
('A Traditional Art Form', 'Tell me about a traditional art form in your country. What is it? How is it done? Do you like it?', 'A2', 'Art & Culture', ARRAY['Simple present', 'Imperatives', 'How to instructions'], ARRAY['Art vocabulary', 'Materials', 'Traditional words'], 'Tips: Describe the process step-by-step using simple language. Use "You....", "First", "Then", "Finally". Explain basic techniques clearly. Give personal opinion.'),

('An Exhibition or Museum Visit', 'Describe a visit to an interesting exhibition or museum. What did you see? How did you feel? Would you recommend it?', 'B1', 'Art & Culture', ARRAY['Past simple', 'Past continuous', 'Adjectives describing feelings'], ARRAY['Exhibition vocabulary', 'Art styles', 'Emotion words'], 'Tips: Set the scene with when and where. Use past tenses consistently. Describe specific exhibits you remember. Express your reactions and emotions. Use "I found it fascinating because..."'),

('A Book, Film or Song', 'Talk about a book, film or song you like. What is it about? Why do you like it? Who else should watch/read/listen to it?', 'B1', 'Art & Culture', ARRAY['Present tense for plots', 'Reason clauses', 'Recommendation structures'], ARRAY['Entertainment vocabulary', 'Genre words', 'Emotion and opinion words'], 'Tips: Summarize the plot briefly without too many details. Explain what appealed to you. Use "I would definitely recommend..." and "It''s perfect for people who...".'),

('A Famous Artist or Creator', 'Tell me about a famous artist, musician, or writer you admire. What do they do? Why do you admire them?', 'B2', 'Art & Culture', ARRAY['Present simple for biography', 'Why clauses', 'Comparative structures'], ARRAY['Artistic vocabulary', 'Adjectives for talent', 'Career progression words'], 'Tips: Briefly describe their background and main works. Explain their impact or unique style. Use "What I admire most is..." and "Their contribution to... is significant because...".'),

-- Technology (4 prompts)
('A Useful Technology', 'Describe a piece of technology that is useful in your daily life. What is it? How often do you use it? Why is it useful?', 'A2', 'Technology', ARRAY['Present simple', 'How/why questions', 'Benefit expressions'], ARRAY['Technology vocabulary', 'Device names', 'Advantage words'], 'Tips: Choose a common technology (phone, laptop, etc.). Explain what it does and how you use it. Use "It helps me...", "It allows me to...", "It''s useful because...".'),

('Technology in Your Work or Study', 'Tell me about how you use technology in your work or studies. What tools do you use? How have they changed your work/study?', 'B1', 'Technology', ARRAY['Present perfect', 'Reason clauses', 'Comparison'], ARRAY['Workplace technology', 'Learning tools', 'Change/improvement vocabulary'], 'Tips: Mention specific tools or applications. Explain their functions. Compare how things were before technology. Use "has made it easier/better by...".'),

('A Gadget You''d Like to Own', 'Describe a gadget or piece of technology you would like to own. What is it? What would you use it for? Why do you want it?', 'B1', 'Technology', ARRAY['Conditional (would)', 'Purpose clauses', 'Present simple desires'], ARRAY['Latest gadgets', 'Features vocabulary', 'Desire words'], 'Tips: Use "would like to have" and "would be able to...". Explain specific uses and benefits. Discuss why it appeals to you. Be realistic and specific.'),

('Technology and Society', 'How has technology changed society? What are the positive and negative effects? What about in the future?', 'C1', 'Technology', ARRAY['Present perfect continuous', 'Conditionals', 'Passive voice', 'Complex sentences'], ARRAY['Societal impact vocabulary', 'Trend words', 'Consequence vocabulary'], 'Tips: Provide specific examples of technological changes. Discuss both benefits and drawbacks. Use hedging language ("arguably", "to some extent"). Consider future implications.'),

-- Daily Life & Hobbies (4 prompts)
('Your Daily Routine', 'Tell me about your typical day. When do you wake up? What activities do you do? How much free time do you have?', 'A1', 'Daily Life & Hobbies', ARRAY['Simple present', 'Time expressions', 'Sequencing'], ARRAY['Time vocabulary', 'Daily activities', 'Routine words'], 'Tips: Use simple present tense and time markers: "at 7am", "in the morning", "after breakfast". Describe activities in order. Use sequencing words: "First", "Then", "After that".'),

('A Hobby You Enjoy', 'Describe a hobby you have. What do you do? How often do you do it? How long have you had this hobby?', 'A2', 'Daily Life & Hobbies', ARRAY['Present simple', 'Present perfect', 'Frequency expressions'], ARRAY['Hobby vocabulary', 'Action verbs', 'Enjoyment words'], 'Tips: Explain what your hobby is and what it involves. Use "I enjoy...", "I''m interested in...". Mention how frequently you do it and for how long. Share why you like it.'),

('A Sport You Like to Watch or Play', 'Tell me about a sport you like. Do you play it or watch it? Why do you like it? What qualities does it require?', 'B1', 'Daily Life & Hobbies', ARRAY['Present simple/continuous', 'Reason clauses', 'Descriptive adjectives'], ARRAY['Sports vocabulary', 'Physical qualities', 'Competition words'], 'Tips: Describe the rules or basic elements. If you play: explain your involvement. If you watch: who/when you watch. Use "requires", "demands", "involves" to describe qualities needed.'),

('Something You Do to Relax', 'Describe something you do to relax or unwind. What is it? How often do you do it? Why does it help you relax?', 'B1', 'Daily Life & Hobbies', ARRAY['Present simple', 'Reason clauses', 'Descriptive language'], ARRAY['Relaxation vocabulary', 'Stress-related words', 'Sensation words'], 'Tips: Choose a genuine activity (reading, exercising, cooking, etc.). Explain the process or experience. Use sensory words and emotions: "It helps me feel...", "It allows me to...".'),

-- People & Relationships (3 prompts)
('A Person You Admire', 'Tell me about a person you admire. Who are they? What do they do? Why do you admire them?', 'A2', 'People & Relationships', ARRAY['Present simple', 'Reason clauses', 'Relative clauses'], ARRAY['Personality traits', 'Admiration vocabulary', 'Qualities words'], 'Tips: Introduce the person clearly (family, friend, public figure). Describe their characteristics and accomplishments. Use "I admire them because...", "What I like about... is...".'),

('A Friend You Know Well', 'Describe a friend you know well. How long have you known them? What do you have in common? What do you like to do together?', 'A2', 'People & Relationships', ARRAY['Present perfect', 'Present simple', 'Comparison structures'], ARRAY['Friendship vocabulary', 'Personality traits', 'Activity words'], 'Tips: Introduce how you met and how long you''ve known each other. Describe their personality. Mention shared interests and activities. Explain what makes them a good friend.'),

('An Interesting Person You Know', 'Talk about an interesting person you know. What do they do? What makes them interesting? How did you meet them?', 'B1', 'People & Relationships', ARRAY['Present simple', 'Past simple for stories', 'Relative clauses'], ARRAY['Character description words', 'Profession vocabulary', 'Interest words'], 'Tips: Make them sound genuinely interesting with specific details. Use the past to explain how you met. Describe their personality, job, or hobbies. Use "What makes them interesting is..."'),

-- Experiences & Memories (3 prompts)
('A Memorable Journey or Trip', 'Tell me about a memorable trip you have taken. Where did you go? Who did you go with? What made it special?', 'B1', 'Experiences & Memories', ARRAY['Past simple', 'Past continuous', 'Sequencing past events'], ARRAY['Travel vocabulary', 'Experience words', 'Emotion words'], 'Tips: Use past tenses throughout. Set the scene (where, when, who). Describe the journey and highlights. Use "The most memorable moment was..." Explain why it was special.'),

('A Time You Learned Something New', 'Tell me about a time when you learned something new. What did you learn? How did you learn it? How did it change you?', 'B1', 'Experiences & Memories', ARRAY['Past simple', 'Past perfect', 'Learning expressions'], ARRAY['Learning vocabulary', 'Challenge words', 'Growth vocabulary'], 'Tips: Choose a specific learning experience. Describe the process and your feelings. Use "I realized...", "I discovered that..." Explain how it impacted you.'),

('An Achievement You''re Proud Of', 'Describe an achievement you are proud of. What did you achieve? How did you do it? How do you feel about it?', 'B2', 'Experiences & Memories', ARRAY['Present perfect', 'Past simple for story', 'Reason clauses'], ARRAY['Achievement vocabulary', 'Effort words', 'Pride-related words'], 'Tips: Select something genuine and meaningful. Describe the effort and obstacles overcome. Use "I''m proud of...", "It took... because...". Explain its significance to you personally.');
