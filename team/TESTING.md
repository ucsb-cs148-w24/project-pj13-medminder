Our team experimented with **Jest** to set up unit tests. 
Please see [SetDateOnMain.test.js](/medminder/src/tests/SetDateOnMain.test.js)

We can visually confirm that our components are loaded in, and with the correct information. 
Jest checks by rendering a component, for example the `DateNavigator`, and testing its contents against an expected value.
```
render(<DateNavigator/>);
const currentDateElement = screen.getByText(/February 16, 2024/);
expect(currentDateElement).toBeInTheDocument();
```

Jest can also test the functionality of buttons by simulating a click and comparing the results against the intended behavior.
```
const currentDateElement = screen.getByText(/February 16, 2024/);
const leftArrowButton = screen.getByRole('button', { name: /arrow-left/i });
...
// Click the left arrow button
act(() => {
  fireEvent.click(leftArrowButton);
});
expect(currentDateElement).toHaveTextContent(/February 15, 2024/);
```

This experiment focused on the simpler use cases of Jest, as we are getting started. Our next target is the big modal (pop-up) 
for users to enter medication into. We plan to validate the data being entered and ensure that our Firebase Realtime Database is
receiving the appropriate values.
