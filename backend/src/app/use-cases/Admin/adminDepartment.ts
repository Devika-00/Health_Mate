import { IDepartmentRepository } from "../../interfaces/departmentDbRepository";

export const addOneDepartment = async (
  departmentName: string,
  isListed: boolean,
  departmentDbRepository: ReturnType<IDepartmentRepository>
) => {
  const department = await departmentDbRepository.addNewDepartment(departmentName,isListed);
  return department;
};

export const Department = async (
    departmentDbRepository: ReturnType<IDepartmentRepository>
  ) => {
    const department = await departmentDbRepository.getDepartment();
    return department;
  };

export const departmentUpdate = async (
    departmentname :string,
    id:any,
    departmentDbRepository: ReturnType<IDepartmentRepository>
)=>{
    const department = await departmentDbRepository.updateDepartment(departmentname,id);
    return department;
} 

export const departmentUnlist = async (
    id: string,
    departmentDbRepository: ReturnType<IDepartmentRepository>
  ) => {
    const department = await departmentDbRepository.getDepartmentbyId(id);
  
    await departmentDbRepository.updateDepartmentUnlist(id, !department?.isListed); 
    return department;
  };
  
  
