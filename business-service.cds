using {db.BusinessPartner as my} from '../db/schema';
using { API_BUSINESS_PARTNER as abp } from './external/API_BUSINESS_PARTNER';

service BusinessService {  
    entity BusinessPartner as projection on my.BusinessPartner;
    @readonly
    entity A_BusinessPartner as projection on abp.A_BusinessPartner {
        key BusinessPartner, Customer, BusinessPartnerFullName, BusinessPartnerGrouping, BusinessPartnerUUID, OrganizationBPName1 
    }
}