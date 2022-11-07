import { createMachine, assign } from "xstate";

export const formMachine = createMachine(
  {
    initial: "editing",
    context: {
      values: {},
      errors: {},
    },
    states: {
      editing: {
        initial: "pristine",
        on: {
          CHANGE: {
            actions: ["onChange"],
          },
          SUBMIT: "submitting",
        },
        states: {
          pristine: {
            // This is up to you, but I felt like the form needed to be cleared before receiving a new submission
            entry: ["clearForm"],
          },
          error: {},
        },
      },
      submitting: {
        invoke: {
          src: "onSubmit",
          onDone: "success",
          onError: {
            target: "editing.error",
            actions: ["onError"],
          },
        },
      },
      success: {
        on: {
          AGAIN: "editing",
        },
      },
    },
  },
  {
    actions: {
      onChange: assign({
        values: (ctx, e) => ({
          ...ctx.values,
          [e.key]: e.value,
        }),
      }),
      clearForm: assign({
        values: {},
        errors: {},
      }),
      onError: assign({
        errors: (_ctx, e) => e.data,
      }),
    },
  }
);
