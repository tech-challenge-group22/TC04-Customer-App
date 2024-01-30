import ICustomerRepository from "../../../../../../../src/domain/aggregates/userAccess/core/ports/ICustomerRepository";
import UpdateCustomer from "../../../../../../../src/domain/aggregates/userAccess/usecases/updateCustomer/UpdateCustomer";
import { UpdateCustomerInputDTO } from "../../../../../../../src/domain/aggregates/userAccess/usecases/updateCustomer/UpdateCustomerDTO";

const mockCustomerInput: UpdateCustomerInputDTO = {
    id: 1,
    cpf: '40129666009',
    name: 'Updated Name',
    email: 'updated@email.com',
    isActive: true
  };

const mockUpdatedCustomer = [{
    id: 1,
    cpf: '40129666009',
    name: 'Updated Name',
    email: 'updated@email.com',
    isActive: true
  }];

const customerRepositoryMock: ICustomerRepository = {
    getCustomers: jest.fn(),
    createCustomer: jest.fn(),
    getCustomerById: jest.fn(),
    getCustomerByCPF: jest.fn(),
    updateCustomer: jest.fn().mockResolvedValue(mockUpdatedCustomer),
    deleteCustomer: jest.fn(),
};


describe('UpdateCustomer Use Case', () => {
    it('should successfully update a customer', async () => {
        const updateCustomer = new UpdateCustomer(customerRepositoryMock);
        const result = await updateCustomer.execute(mockCustomerInput);
        expect(result.hasError).toBe(false);
        expect(result.message).toBe(mockUpdatedCustomer);
      });
      it('should call updateCustomer with correct parameters', async () => {
        const updateCustomer = new UpdateCustomer(customerRepositoryMock);
        await updateCustomer.execute(mockCustomerInput);
      
        expect(customerRepositoryMock.updateCustomer).toHaveBeenCalledWith(
          mockCustomerInput.id,
          mockCustomerInput.name,
          mockCustomerInput.email,
          mockCustomerInput.cpf,
          mockCustomerInput.isActive
        );
      });
      it('should handle errors from the repository', async () => {

        const mockUpdatedCustomer = [{
            id: 1,
            cpf: '40129666009',
            name: 'Updated Name',
            email: 'updated@email.com',
            isActive: true
          }];
        
        const customerRepositoryErrorMock: ICustomerRepository = {
            getCustomers: jest.fn(),
            createCustomer: jest.fn(),
            getCustomerById: jest.fn(),
            getCustomerByCPF: jest.fn(),
            updateCustomer: jest.fn(() => {
                throw new Error('Error updating customer');
            }),
            deleteCustomer: jest.fn(),
        };

        //customerRepositoryMock.updateCustomer.mockRejectedValue(new Error(errorMessage));
      
        const updateCustomer = new UpdateCustomer(customerRepositoryErrorMock);
        const result = await updateCustomer.execute(mockCustomerInput);
      
        expect(result.hasError).toBe(true);
        expect(result.message).toStrictEqual(Error('Error updating customer'));
        //expect(result.message).toContain(errorMessage);
      });
});
  
  