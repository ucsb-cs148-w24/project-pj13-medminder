List the AI tool you utilized, the outcomes you produced, and, importantly, reflections on
how useful this tool was / potentially could be for your coding effort going forward
what steps you needed to (or couldn’t) take to ensure that the AI output was correct, understandable, and fair use
A new Slack channel help_ai was created to provide pointers to useful AI coding tools. In addition to documenting your
efforts in your own team-internal team/AI_CODING.md file, please share pointers to the tools you were most excited about in there.

Edwin Yee -
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

