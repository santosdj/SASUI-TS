import { IData } from "../pages/RequestStepForm/components/Interface";
import api from "./api";

export const enum EUserTypes {
  New = "S",
  Existent = "N",
  Blocked = "D",
}
export const enum EServiceIds {
  AddProfile = "24",
  ExcludeProfile = "25",
  CreateUser = "26",
  BlockUser = "27",
  UnBlockUser = "194",
}

class SAPService {
  async getSAPEnvironmentCollection(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    id?: string
  ): Promise<IData[]> {
    const data = [
      {
        id: "ECC",
        description: "ECC-Produção",
      },
      {
        id: "BW",
        description: "BW-Produção",
      },
      {
        id: "BRT",
        description: "BRT-Teste",
      },
      {
        id: "GRC",
        description: "GRC-Produção NFP",
      },
      {
        id: "SIGGA",
        description: "SIGGA-Mobile Manutenção",
      },
    ];
    return data;
  }

  async getSAPUserTypeCollection(id?: string): Promise<IData[]> {
    console.log("...pegando user types");
    if (id === EServiceIds.AddProfile) {
      return [
        {
          id: EUserTypes.New,
          description: "Novo",
        },
        {
          id: EUserTypes.Existent,
          description: "Existente",
        },
        {
          id: EUserTypes.Blocked,
          description: "Desbloqueio",
        },
      ];
    }
    if (id === EServiceIds.UnBlockUser) {
      return [
        {
          id: EUserTypes.Blocked,
          description: "Desbloqueio",
        },
      ];
    }

    return [
      {
        id: EUserTypes.Existent,
        description: "Existente",
      },
    ];
  }

  async getSAPServiceTypeCollection(id?: string): Promise<IData[]> {
    console.log(`Getting service yptes ${id}`);
    // Defining the service types based on the user_type
    if (!id)
      return [
        {
          id: EServiceIds.AddProfile,
          description: "Liberação de Perfil",
        },
        {
          id: EServiceIds.ExcludeProfile,
          description: "Exclusão de Perfil",
        },
        {
          id: EServiceIds.BlockUser,
          description: "Bloqueio de Usuário",
        },
        {
          id: EServiceIds.UnBlockUser,
          description: "Desbloqueio de Usuário",
        },
      ];

    if (id === "N")
      return [
        {
          id: EServiceIds.AddProfile,
          description: "Liberação de Perfil",
        },
        {
          id: EServiceIds.ExcludeProfile,
          description: "Exclusão de Perfil",
        },
        {
          id: EServiceIds.BlockUser,
          description: "Bloqueio de Usuário",
        },
      ];

    if (id === "D")
      return [
        {
          id: EServiceIds.AddProfile,
          description: "Liberação de Perfil",
        },
        {
          id: EServiceIds.ExcludeProfile,
          description: "Exclusão de Perfil",
        },
        {
          id: EServiceIds.UnBlockUser,
          description: "Desbloqueio de Usuário",
        },
      ];

    return [
      {
        id: EServiceIds.AddProfile,
        description: "Liberação de Perfil",
      },
      {
        id: EServiceIds.ExcludeProfile,
        description: "Exclusão de Perfil",
      },
    ];
  }

  async getSAPProfileTypeCollection(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    id?: string
  ): Promise<IData[]> {
    const data = [
      {
        id: "1",
        description: "Outros",
      },
      {
        id: "2",
        description: "Job Position",
      },
    ];
    return data;
  }

  async getSAPUserIdCollection(id = "ECC"): Promise<IData[]> {
    const response = await api.get(`/sap/users/${id}`);
    const { data } = response;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mapeddata = data.map((value: any) => {
      return { id: value.user_user_id, description: value.user_user_name };
    });

    return mapeddata;
  }

  async getJobPositionCollection(
    manager_id: string,
    cost_center_id: string
  ): Promise<IData[]> {
    const response = await api.get(
      `/sap/jobpositions/${manager_id}/${cost_center_id}`
    );
    const { data } = response;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mapeddata = data.map((value: any) => {
      return { id: value.id, description: value.job_position };
    });

    return mapeddata;
  }

  getSAPTemporyFieldCollection = async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    id?: string
  ): Promise<IData[]> => {
    const data = [
      {
        id: "S",
        description: "Sim",
      },
      {
        id: "N",
        description: "Não",
      },
    ];
    return data;
  };

  getSAProfileCollection = async (
    environment: string,
    param: string,
    take: string
  ): Promise<IData[]> => {
    console.log(`searching on ${environment}`);
    const response = await api.get(
      `/sap/profiles/search/${environment}?param=${param}&take=${take}`
    );
    const { data } = response;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mapeddata = data.map((value: any) => {
      return { id: value.profile_name, description: value.profile_description };
    });

    return mapeddata;
  };
}

const sapService = new SAPService();

export { sapService };
