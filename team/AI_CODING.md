List the AI tool you utilized, the outcomes you produced, and, importantly, reflections on
how useful this tool was / potentially could be for your coding effort going forward
what steps you needed to (or couldn’t) take to ensure that the AI output was correct, understandable, and fair use
A new Slack channel help_ai was created to provide pointers to useful AI coding tools. In addition to documenting your
efforts in your own team-internal team/AI_CODING.md file, please share pointers to the tools you were most excited about in there.

# **Edwin Yee**:
AI tool used: Google Gemini
Outcomes produced: Generated code for the improved medicine reminder popup (replacing the hard to read medicine toast)
Reflections: Google Gemini was very useful in helping me change and write code. Although I had to adjust certain pieces of code to 
work with our web application such as changing imports and css styling, the structure of the code was mostly correct.
Here are some of the queries that I asked Gemini, where I included the relevant code below my query. I found that being very specific
about what I wanted, helped Gemini generate more relevat / useful code.

1. "I want a React Popup page to appear when it is time for user to take their medication. This Popup modal should styled and display the medicine name, medicine dosage, and have a button to close the Popup. Please remove the existing Toastify code and replace it with a Popup modal."
2. Could you help me with the CSS styling and put a white box behind the modal popup and center it on the screen?
3. I want it so that the modal appears on top of all the elements in the website. How can I do this? I also want the modal to be large and centered on the screen so that it is easily visible.
4. Can you style my button so that it looks like a medicine pill?
5. My button is too close to the text. How can I move my button further down the modal?

# **Garvin Young:**
The Ai Tool I used was ChatGPT 3.5. I wanted to get help on making ui that was pleasant to look at and since this is my first time making .css files, I asked ChatGPT for the general rundown for some of the most usefull .css file fields and how to use them.
The prompts I gave chat gpt was:
1. what are some common css fields and how do you use them
2. what are all the possible fields for position and how do they differ from one another
3. what are some other css fields that weren't already mentioned
4. how do you make a grid layout for a page in css
As well as additional clarifying questions.

Given how I was using AI as a search tool for simple css fields instead of a tool writer for more complex problems I would say that it was pretty helpful. At least in this experience, it acted as a better google for figuring out the basics of css. In the past I have used ai to try to write more complex functions and it wasn't always the best due to limitations in how much information I'm able to give in a prompt. Another issue is that once ChatGPT gives one way to solve it problem, it never really deviates from that one solution even if you tell it to give a different way to solve the problem. Overall, I would say ChatGPT is much for helpful to be used as a search function instead of a code writer since it is much easier to use than having to look at stack exchange or trying to understand monotonous function documentation. 

It wasn't too hard figuring out if the outcome was correct given I was asking very simple questions. I would just use the functions on my local machine and play around with values to see how it changes. As mentioned before, once you get to more complex problems ai isn't necessarily the best since it's prone to errors whether that may be the code not working or the ai not understanding the user exactly. In that case, it would be better to search up a youtube video since that is a human that can give a step by step walkthrough of a file although that requires a bit more critical thinking from the user. As for it being fair use, it really isn't feasible for the user to know where ChatGPT got the code from. Given my simple questions on css, the outputs were simple fields for a css file which would be part of basic documentation so that is probably fair use, but for more complex problems that actually require problem solving, the ai doesn't have that benefit of the doubt.

# **Vaishnavi Himakunthala:**
AI tool: Chat-GPT
Prompts:
Given this CSS file, can you modify it so that when we zoom in/ change the screen size, the components don't overlap each other.

The code that chat-gpt gave me was not entirely accurate, and I had to change a lot of things. Even after that, some of the components were overlapping even with the css code that changed. However, when I zoomed in, none of the components overlapped so I think that worked. In general, I think it's probably not a good idea to fully depend on chat-gpt for ui changes.

# **Hanson Yu:**
I used ChatGPT 4 to help me figure out how to create a jest unit test. I asked ChatGPT to create a basic unit test and ran the generated code in the project and found which parts were not compatible and attempted to figure out how to resolve the problems. I asked ChatGPT how to resolve the problems I ran into and implemented those changes. By doing this I was able to implement a simple unit test.

This tool could be used to help us figure out how to use new technologies and figure out how to resolve errors. The steps that I took to make sure there were no errors in the code generated was to read through the code line by line and run in in the app itself and resolve any issues that showed up.


# **James Pflaging:**
AI tool: Chat-GPT
Process and outcomes: I used Chat-GPT to help generate code for connecting our stored reminders to a user's google calendar. Honestly its done a really solid job - while the code isn't perfect and has some problems it has a great baseline and has saved me a tone of time. I was already aware of the google calendar api that it referenced which helped me in understanding its response. This isn't the first time I've used chatGPT to help me on our project and its been pretty reliable each time. Before this quarter I thought it produced code with way more errors but GPT4 does better than I thought but maybe not as good as I hoped.
Reflections: I'm sure these kind of tools will become increasingly helpful going foward. It's kind of scary in a way but at least for now there are certainly problems with the output it produces. Also, when using it to generate code in an area I don't understand it can be counterproductive because I don't have to learn things as well. Sometimes using the code it produces and then diagnosing all of the issues takes longer than reading stuff on stackOverflow or youtube. That being said it definitely provides a new way of learning since you can get a boilerplate and contribute to it as you go instead of building things from the ground up.

# **Michael Cheng:**
I tried `v0.dev` for UI components.

My focus was looking into a date/time selector, so a user can more intuitively + easily select the target time for an alert to go off. The components I was able to generate were mediocre, especially the initial button (appearing as a small clock) after multiple iterations. Also, I had trouble getting a date and time selector together; most solutions had separate dropdowns / menus for each. The first couple generations of every prompt always had one very horrible design, all left-aligned and all over the the place. Thus, I conclude that `v0.dev` requires a decent amount of human intervention and intermediate support.

Overall, `v0.dev` has a very niche use case, with better support for more general components. Many example components polished by other users followed a similar text-based form format, which is probably its best use.

Note: I was unable to integrate any `shadcn/ui` components generated by `v0.dev` into our project, as our React App cannot natively connect easily. I attempted to install `Tailwindcss` but I got stuck while modifying the configurations. 

# **Timothy Choi:**
AI tool: ChatGPT 4
I used ChatGPT to test sending and storing data in our Firebase database. I asked ChatGPT to look at our code and check for any bugs in our popup button. There are many fields in the button such as the days to take medicine, time, frequency, etc. and I wanted to test all possible combinations that a user might select. 
That being said, I found that ChatGPT was good at finding syntax erros while its logic could be a bit flawed at times. Overall, found that ChatGPT is probably best for creating skeleton code and then a human to build out the code more thoroughly. 
