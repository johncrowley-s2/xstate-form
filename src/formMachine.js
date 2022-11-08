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
        initial: "new",
        on: {
          CHANGE: {
            actions: ["onChange"],
          },
          SUBMIT: "pending",
        },
        states: {
          new: {
            entry: ["clearForm"],
          },
          error: {},
        },
      },
      pending: {
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
