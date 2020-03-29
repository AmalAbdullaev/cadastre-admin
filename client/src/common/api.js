export default {
  client: {
    fetchClients: () => {
      return "/clients";
    },
    fetchClientsForm: () => {
      return "/clients/form";
    }
  },
  proposal: {
    fetchProposals: () => {
      return "/proposals";
    }
  }
};
