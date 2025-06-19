import axios from 'axios';
const CompanyService = {
  getCompanies: async () => {
    try {
      const response = await axios.get('http://localhost:5052/api/Company/GetAllCompany');
      return response.data;
    } catch (error) {
      console.error('Şirketler alınamadı:', error);
      throw error;
    }
  },
   addCompany: async (companyData) => {
    try {
        console.log(companyData);
      const response = await axios.post('http://localhost:5052/api/Company', companyData);
      return response.data;
    } catch (error) {
      console.error('Şirket eklenirken hata oluştu:', error);
      throw error;
    }
  },
  updateCompany: async (companyData) => {
    try {
        console.log(companyData);
      const response = await axios.put('http://localhost:5052/api/Company/'+companyData.id, companyData);
      return response.data;
    } catch (error) {
      console.error('Şirket eklenirken hata oluştu:', error);
      throw error;
    }
  },
  deleteCompany: async (id) => {
    try {
      
      const response = await axios.delete('http://localhost:5052/api/Company/'+id);
      return response.data;
    } catch (error) {
      console.error('Şirket eklenirken hata oluştu:', error);
      throw error;
    }
  }
};
export default CompanyService;