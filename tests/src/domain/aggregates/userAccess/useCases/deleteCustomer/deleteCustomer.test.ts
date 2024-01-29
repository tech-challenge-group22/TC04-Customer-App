import ICustomerRepository from "../../../../../../../src/domain/aggregates/userAccess/core/ports/ICustomerRepository";
import DeleteCustomer from "../../../../../../../src/domain/aggregates/userAccess/usecases/deleteCustomer/DeleteCustomer";
import { DeleteCustomerInputDTO } from "../../../../../../../src/domain/aggregates/userAccess/usecases/deleteCustomer/DeleteCustomerDTO";

const validDeleteInput: DeleteCustomerInputDTO = { id: 1 };
const customerRepositoryMock: ICustomerRepository = {
    getCustomers: jest.fn(),
    createCustomer: jest.fn(),
    getCustomerById: jest.fn(),
    getCustomerByCPF: jest.fn(),
    updateCustomer: jest.fn(),
    deleteCustomer: jest.fn().mockResolvedValue(validDeleteInput),
};


describe('DeleteCustomer Use Case', () => {
    it('should successfully delete a customer', async () => {
      // Mock the deleteCustomer method to simulate successful deletion
      //customerRepositoryMock.deleteCustomer.mockResolvedValue('Customer deleted successfully');
  
      const deleteCustomer = new DeleteCustomer(customerRepositoryMock);
      const result = await deleteCustomer.execute(validDeleteInput);
  
      expect(result.hasError).toBe(false);
      expect(customerRepositoryMock.deleteCustomer).toHaveBeenCalledWith(validDeleteInput.id);
    });
  
    it('should handle errors from the repository', async () => {
        
        const customerRepositoryErrorMock: ICustomerRepository = {
            getCustomers: jest.fn(),
            createCustomer: jest.fn(),
            getCustomerById: jest.fn(),
            getCustomerByCPF: jest.fn(),
            updateCustomer: jest.fn(),
            deleteCustomer: jest.fn(() => {
                throw new Error('Error deleting customer');
            }),
        };
      
        const deleteCustomer = new DeleteCustomer(customerRepositoryErrorMock);
        const result = await deleteCustomer.execute(validDeleteInput);
      
        expect(result.hasError).toBe(true);
        expect(result.message).toStrictEqual(Error('Error deleting customer'));
      });

  });
  