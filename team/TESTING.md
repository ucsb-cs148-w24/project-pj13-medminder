Our team experimented with **Jest** to set up unit tests. 
Please see [SetDateOnMain.test.jsx](https://github.com/ucsb-cs148-w24/project-pj13-medminder/pull/122/files#diff-f255a1fc3b7aa6828f02dca7726677293137b40adb20256e0f053cf3b20207d9)

(TODO: replace link with file in main branch after PR#122 is merged)

We can visually confirmation that our components are loaded in, and with the correct information. 
Jest checks by rendering a component, for example the `DateNavigator`, and test its contents against an expected value.
```
render(<DateNavigator/>);
const currentDateElement = screen.getByText(/February 16, 2024/);
expect(currentDateElement).toBeInTheDocument();
```

Jest can also test the functionality of buttons, by simulating a click and comparing the results against the intended behavior.
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
