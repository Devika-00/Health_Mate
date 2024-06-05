
import Department from "../models/Department";

export const departmentRepositoryMongodb = () => {
    
  const newDepartment = async (departmentName:string,isListed:boolean) =>{
    const response = new Department({
        departmentName: departmentName,
        isListed: isListed,
    });
    await response.save();
    
    return response;
  }

  const getAllDepartment = async () =>{
    const response = await Department.find({isListed:true});
    
    return response;
  }

  const updateDepartmentUnlist= async (id: string, status: boolean) =>{
    await Department.findByIdAndUpdate(id, { isListed: status });
}


  const updateDepartmentName = async (departmentName: string, id: any) => {

  
    try {
      const response = await Department.findByIdAndUpdate(
        id,
        { departmentName: departmentName },
        { new: true, runValidators: true }
      );
      return response;
    } catch (error) {
      console.error("Error updating department name:", error);
      throw error;
    }
  };

  const getDepartmentbyId = async (id: string) => await Department.findById(id);


    return {
        newDepartment,
        getAllDepartment,
        updateDepartmentName,
        getDepartmentbyId,
        updateDepartmentUnlist,
    };
  };
  
  export type departmentRepositoryMongodbType = typeof departmentRepositoryMongodb;


  