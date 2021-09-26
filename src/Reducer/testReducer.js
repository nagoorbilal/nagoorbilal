const defaultState = {
  
 
// Item registry
ItemData: [],
ItemID: '',
ItemActive: '',

CustomerData: [],
CustomerID:  '',
CustomerAcitve:  '',
CustBilldata: [],
IscustomerBill: '',
CusBillRefresh: '',
removeSalEdit: '',
SelectData: [],

PurCustomerData: [],
PurchaseBilldata: [],

};


export default function(state = defaultState, action = {}) {
  switch (action.type) {

    case "SelectData":
      return{
        ...state,
        SelectData: action.SelectData
      }

      // Item Registry
    
    case "ItemData":
      return{
        ...state,
        ItemData: action.data
      }
    case "Item_Edit":
      return{
        ...state,
        ItemID: action.id,
        ItemActive: action.active,
      }

      //Customer Registry
      case "CustomerData":
        return{
          ...state,
          CustomerData: action.data
        }

        case "Customer_Edit":
          return{
            ...state,
            CustomerID: action.id,
            CustomerAcitve: action.active
          }
      case "customerBillInfo":
        return{
          ...state,
          CustBilldata: action.data,
        }

    case "IscustomerBill":
      return{
        ...state,
        IscustomerBill: action.IscustomerBill,
      }

      case "CusBillRefresh":
        return{
          ...state,
          CusBillRefresh: action.CusBillRefresh,
        }


        case "removeSalEdit":
          return{
            ...state,
            removeSalEdit: action.removeSalEdit,
          }

      //Purchse Customer Registry
      case "PurCustomerData":
        return{
          ...state,
          PurCustomerData: action.data
        }
        case "PurCustomer_Edit":
          return{
            ...state,
            CustomerID: action.id,
            CustomerAcitve: action.active
          }

          case "PurchaseBillInfo":
            return{
              ...state,
              PurchaseBilldata: action.data,
            }
    
  
    default:  
      return state;
    }
}
