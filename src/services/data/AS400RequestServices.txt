/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ISelectData,
  IAS400RoutineData,
  IAS400Profile,
} from "../../pages/RequestStepForm/components/Interface";

const API_BASE_URL = process.env.REACT_APP_API_SAS_URL;

export const enum EServiceIds {
  AddProfile = "06",
  ExcludeProfile = "20",
  CreateUser = "01",
  BlockUser = "13",
  CopyUser = "193",
}

export const getAS400ServiceTypeCollection = async (
  id?: string
): Promise<ISelectData[]> => {
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
};

export const enum EUserTypes {
  New = "S",
  Existent = "N",
}

export const getAS400JobPositionCollection = async (
  id?: string
): Promise<ISelectData[]> => {
  const url = `${API_BASE_URL}/as400/profiles`;
  const response = await fetch(url);
  const data = await response.json();
  const profiles = data
    .map((value: any) => {
      return { id: value.profile, description: value.profile };
    })
    .sort((a: any, b: any) => a.id - b.id);

  return profiles;
};

export const getAS400JobPosition = async (
  id?: string
): Promise<IAS400Profile[]> => {
  const url = `${API_BASE_URL}/as400/profiles/${id}`;
  const response = await fetch(url);
  const data = await response.json();

  return data;
};

export const getAS400YesNoCollection = async (
  id?: string
): Promise<ISelectData[]> => {
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
};

export const getAS400UserTypeCollection = async (
  id?: string
): Promise<ISelectData[]> => {
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
};

export const getAS400UsersByNameCollection = async (
  name: string
): Promise<ISelectData[]> => {
  const url = `${API_BASE_URL}/as400/users/${name}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const getAS400EnvironmentCollection = async (
  id?: string
): Promise<ISelectData[]> => {
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
};
export const getAS400SystemCollection = async (
  id?: string
): Promise<ISelectData[]> => {
  const url = `${API_BASE_URL}/as400/systems`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const getAS400RoutineCollection = async (
  id?: string
): Promise<IAS400RoutineData[]> => {
  const url = `${API_BASE_URL}/as400/systems/${id}`;
  const response = await fetch(url);
  const data = await response.json();

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
};

export const getCompanyOnlyCollection = async (
  id?: string
): Promise<ISelectData[]> => {
  const url = `${API_BASE_URL}/as400/companies`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const getBranchOnlyCollection = async (
  id?: string
): Promise<ISelectData[]> => {
  if (id) {
    const url = `${API_BASE_URL}/as400/companies/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    const branch = data.branchs
      .map((value: any) => {
        return { id: value.id, description: value.branch_name };
      })
      .sort((a: any, b: any) => parseInt(a.id, 10) - parseInt(b.id, 10));

    return branch;
  }

  return [];
};

export const getRegionCollection = async (
  id?: string
): Promise<ISelectData[]> => {
  const url = `${API_BASE_URL}/as400/regions`;
  const response = await fetch(url);
  const data = await response.json();
  const regions = data
    .map((value: any) => {
      return { id: value.id, description: value.region_name };
    })
    .sort((a: any, b: any) => parseInt(a.id, 10) - parseInt(b.id, 10));

  return regions;
};
