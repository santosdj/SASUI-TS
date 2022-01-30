/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IAS400Profile,
  IAS400RoutineData,
  ISelectData,
} from "../pages/RequestStepForm/components/Interface";
import api from "./api";

export const enum EServiceIds {
  AddProfile = "06",
  ExcludeProfile = "20",
  CreateUser = "01",
  BlockUser = "13",
  CopyUser = "193",
}

export const enum EUserTypes {
  New = "S",
  Existent = "N",
}

class AS400Service {
  async getAS400ServiceTypeCollection(id?: string): Promise<ISelectData[]> {
    return [
      {
        id: EServiceIds.AddProfile,
        description: "Liberação de Acesso",
      },

      {
        id: EServiceIds.ExcludeProfile,
        description: "Exclusão de Acesso",
      },
      {
        id: EServiceIds.CopyUser,
        description: "Duplicação de Acesso",
      },
    ];
  }

  async getAS400JobPositionCollection(id?: string): Promise<ISelectData[]> {
    const response = await api.get(`/as400/profiles`);
    const { data } = response;
    const profiles = data
      .map((value: any) => {
        return { id: value.profile, description: value.profile };
      })
      .sort((a: any, b: any) => a.id - b.id);

    return profiles;
  }

  async getAS400JobPosition(id?: string): Promise<IAS400Profile[]> {
    const response = await api.get(`/as400/profiles/${id}`);
    const { data } = response;

    return data;
  }

  async getAS400YesNoCollection(id?: string): Promise<ISelectData[]> {
    const data = [
      {
        id: EUserTypes.New,
        description: "Sim",
      },
      {
        id: EUserTypes.Existent,
        description: "Não",
      },
    ];
    return data;
  }

  async getAS400UserTypeCollection(id?: string): Promise<ISelectData[]> {
    const data = [
      {
        id: EUserTypes.New,
        description: "Sim",
      },
      {
        id: EUserTypes.Existent,
        description: "Não",
      },
    ];
    return data;
  }

  async getAS400UsersByNameCollection(name: string): Promise<ISelectData[]> {
    const response = await api.get(`/as400/users/${name}`);
    const { data } = response;
    return data;
  }

  async getAS400EnvironmentCollection(id?: string): Promise<ISelectData[]> {
    const data = [
      {
        id: "BRCOIBB1",
        description: "Legado Citros Produção",
      },
      {
        id: "BRCOIBB2",
        description: "Legado Citros Desenvolvimento",
      },
      {
        id: "BRCOISP1",
        description: "Produção",
      },
      {
        id: "BRCOISP2",
        description: "Qualidade",
      },
      {
        id: "BRCOISP5",
        description: "Desenvolvimento",
      },
    ];
    return data;
  }

  async getAS400SystemCollection(id?: string): Promise<ISelectData[]> {
    const response = await api.get(`/as400/systems`);
    const { data } = response;
    return data;
  }

  async getAS400RoutineCollection(id?: string): Promise<IAS400RoutineData[]> {
    const response = await api.get(`/as400/systems/${id}`);
    const { data } = response;

    const mapeddata = data.routines
      .map(
        ({
          routine_id,
          description,
          system_id,
          access_type,
          access_observation,
          limited_access,
          restricted_access,
        }: any) => {
          return {
            id: routine_id,
            description,
            system_id,
            access_type: access_type.trim(),
            access_observation,
            limited_access,
            restricted_access,
          };
        }
      )
      .sort((a: any, b: any) => a.id - b.id);

    return mapeddata;
  }

  async getCompanyOnlyCollection(id?: string): Promise<ISelectData[]> {
    const response = await api.get(`/as400/companies`);
    const { data } = response;
    return data;
  }

  async getBranchOnlyCollection(id?: string): Promise<ISelectData[]> {
    if (id) {
      const response = await api.get(`/as400/companies/${id}`);
      const { data } = response;
      const branch = data.branchs
        .map((value: any) => {
          return { id: value.id, description: value.branch_name };
        })
        .sort((a: any, b: any) => parseInt(a.id, 10) - parseInt(b.id, 10));

      return branch;
    }

    return [];
  }

  async getRegionCollection(id?: string): Promise<ISelectData[]> {
    const response = await api.get(`/as400/regions`);
    const { data } = response;
    const regions = data
      .map((value: any) => {
        return { id: value.id, description: value.region_name };
      })
      .sort((a: any, b: any) => parseInt(a.id, 10) - parseInt(b.id, 10));

    return regions;
  }
}

const as400Service = new AS400Service();

export { as400Service };
