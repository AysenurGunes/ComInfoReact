import axios from 'axios';
const EmployeeService = {
  getEmployees: async () => {
    try {
      const response = await axios.get('http://localhost:5052/api/Employee/GetAll');
      return response.data;
    } catch (error) {
      console.error('Personeller alınamadı:', error);
      throw error;
    }
  },
    getEmployeecomInfos: async (id) => {
    try {
      const response = await axios.get('http://localhost:5052/api/EmployeeComInfo/GetByEmployeeID?id='+id);
      return response.data;
    } catch (error) {
      console.error('Personeller alınamadı:', error);
      throw error;
    }
  },
   addEmployee: async (employeeData) => {
    try {
        console.log(employeeData);
      const response = await axios.post('http://localhost:5052/api/Employee', employeeData);
      return response.data;
    } catch (error) {
      console.error('Personel eklenirken hata oluştu:', error);
      throw error;
    }
  },
  updateEmployee: async (employeeData) => {
    try {
        console.log(employeeData);
      const response = await axios.put('http://localhost:5052/api/Employee/'+employeeData.id, employeeData);
      return response.data;
    } catch (error) {
      console.error('personel eklenirken hata oluştu:', error);
      throw error;
    }
  },
  deleteEmployee: async (id) => {
    try {
      
      const response = await axios.delete('http://localhost:5052/api/Employee/'+id);
      return response.data;
    } catch (error) {
      console.error('Personel eklenirken hata oluştu:', error);
      throw error;
    }
  }
};
export default EmployeeService;