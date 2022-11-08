import { useMachine } from "@xstate/react";
import { useCallback } from "react";
import { onSubmit } from "./api";
import { formMachine } from "./formMachine";

function App() {
  const [state, send] = useMachine(formMachine, {
    services: { onSubmit },
  });

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      send("SUBMIT");
    },
    [send]
  );

  const handleChange = useCallback(
    (e) => {
      e.preventDefault();
      send("CHANGE", { key: e.target.name, value: e.target.value });
    },
    [send]
  );

  const { values, errors } = state.context;

  return (
    <div className="App">
      <div className="formContainer">
        <h2>Machine Form!!</h2>
        <p>
          Welcome to the <b>machine</b>!
        </p>
        {(state.matches("editing") || state.matches("submitting")) && (
          <form onSubmit={handleSubmit}>
            <div className="formGroup">
              <label htmlFor="firstName">First Name:</label>
              <input
                name="firstName"
                value={values.firstName || ""}
                onChange={handleChange}
                disabled={state.matches("submitting")}
              />
            </div>
            <div className="formGroup">
              <label htmlFor="lastName">Last Name:</label>
              <input
                name="lastName"
                value={values.lastName || ""}
                onChange={handleChange}
                disabled={state.matches("submitting")}
              />
            </div>
            <div className="formGroup">
              <label htmlFor="favoriteColor">Favorite Color:</label>
              <input
                name="favoriteColor"
                value={values.favoriteColor || ""}
                onChange={handleChange}
                disabled={state.matches("submitting")}
              />
            </div>
            <div className="formGroup">
              <input type="Submit" disabled={state.matches("submitting")} />
            </div>
          </form>
        )}
        {errors &&
          Object.keys(errors).map((e) => (
            <div key={e} className="error">
              {errors[e]}
            </div>
          ))}
        {state.matches("success") && (
          <div className="success">
            <h3>
              Your name is {values.firstName} {values.lastName} and your
              favorite color is {values.favoriteColor}
            </h3>
            <button onClick={() => send("AGAIN")}>Again!</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
