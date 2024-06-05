
import { departmentRepositoryMongodbType } from "../../frameworks/database/mongodb/repositories/departmentRepositoryMongodb";

export const departmentDbRepository = (repository: ReturnType<departmentRepositoryMongodbType>) => {

  const addNewDepartment  = async (
    departmentName:string,
    isListed:boolean
  )=>{
   const addDepartment =await  repository.newDepartment(departmentName,isListed);
   return addDepartment;
  }

  const getDepartment  = async ()=>{
   const addDepartment =await  repository.getAllDepartment();
   return addDepartment;
  }

  const updateDepartment =async (departmentname:string,id:any) =>{
    const department = await repository.updateDepartmentName(departmentname,id);
    return department;
  }

  const getDepartmentbyId = async (id: string)=> await repository.getDepartmentbyId(id);    

  
  const updateDepartmentUnlist = async (id: string, status: boolean) =>{
    await repository.updateDepartmentUnlist(id, status);
}

  return {
    addNewDepartment,
    getDepartment,
    updateDepartment,
    getDepartmentbyId,
    updateDepartmentUnlist,
  };
};

export type IDepartmentRepository = typeof departmentDbRepository;