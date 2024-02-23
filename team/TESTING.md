Our team experimented with **Jest** and **React Testing Library** to set up tests. 
Please see [SetDateOnMain.test.js](/medminder/src/tests/SetDateOnMain.test.js) and [DeleteAlert.test.js](/medminder/src/tests/DeleteAlert.test.js)

Note: We looked into testing with Jest+Enzyme, but Enzyme is deprecated and only supports React 16 and below. We are using React 18.

We can visually confirm that our components are loaded in, and with the correct information. 
Jest checks by rendering a component, for example the `DateNavigator`, and testing its contents against an expected value.
```
render(<DateNavigator/>);
const currentDateElement = screen.getByText(/February 23, 2024/);
expect(currentDateElement).toBeInTheDocument();
```

Jest (an assertion library) can test the functionality of buttons by simulating a click and comparing the results against the intended behavior.
```
const currentDateElement = screen.getByText(/February 23, 2024/);
const leftArrowButton = screen.getByRole('button', { name: /arrow-left/i });
...
// Click the left arrow button
act(() => {
  fireEvent.click(leftArrowButton);
});
expect(currentDateElement).toHaveTextContent(/February 22, 2024/);
```

Jest can also confirm that the intended function call(s) are being made only when intended in the `DeleteAlert` component.
```
// After delete button press + confirmation=True
expect(jest.requireMock('firebase/database').remove).toHaveBeenCalledWith(
        jest.requireMock('../utils/firebase.utils').database.ref());
```
```
// After delete button press + confirmation=False
expect(jest.requireMock('../utils/firebase.utils').database.ref).not.toHaveBeenCalled();
expect(jest.requireMock('firebase/database').remove).not.toHaveBeenCalled();
```

This experiment focused on common use cases of Jest + React Testing Library. 
Our next target(s) are to verify the rest of our components are working as intended. 
