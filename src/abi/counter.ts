const ABI_COUNTER = {
  types: [
    {
      typeId: 0,
      type: "()",
      components: [],
      typeParameters: null,
    },
    {
      typeId: 1,
      type: "u64",
      components: null,
      typeParameters: null,
    },
  ],
  functions: [
    {
      inputs: [],
      name: "count",
      output: {
        name: "",
        type: 1,
        typeArguments: null,
      },
      attributes: [
        {
          name: "storage",
          arguments: ["read"],
        },
      ],
    },
    {
      inputs: [],
      name: "increment",
      output: {
        name: "",
        type: 0,
        typeArguments: null,
      },
      attributes: [
        {
          name: "storage",
          arguments: ["read", "write"],
        },
      ],
    },
  ],
  loggedTypes: [],
  messagesTypes: [],
  configurables: [],
};

export default ABI_COUNTER;
