namespace db.BusinessPartner;
using { cuid, managed } from '@sap/cds/common';

entity BusinessPartner : cuid {
  BusinessPartner    : String @assert.unique;
  BusinessPartnerFullName          : String;
  BusinessPartnerGrouping          : String;
 
}