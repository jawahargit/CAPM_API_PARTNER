const cds = require('@sap/cds');
module.exports = cds.service.impl(async function(srv) {
    const { BusinessPartner } = this.entities;
   //on is handler method to call external service
    srv.on('READ', 'BusinessPartner', async(req, next) => {     
        //This below code is for to connect to remote serive - "cds.connect.to" will help  .
        const bp = await cds.connect.to('API_BUSINESS_PARTNER');
        const {A_BusinessPartner} = bp.entities;       
        //return bp.run(req.query);  
        
        // after connecting to remote service 'bp', now execute your quires on the service
        // bp.run(SELECT).limit(100) -> this is like select query to the BP servie to fetch 100 records
        const result = await bp.run(SELECT.from(A_BusinessPartner, (bus) => {
            bus.BusinessPartner, 
            bus.Customer, 
            bus.BusinessPartnerFullName, 
            bus.BusinessPartnerGrouping, 
            bus.BusinessPartnerUUID, 
            bus.OrganizationBPName1    
            }).limit(100));
        //This below code is to map /Bind the external servive fields  to the CDS entity BusinessPartner 
        // so that we can see these data on Fiori Preview 
            for (let i = 0; i < result.length; i++) {
                await cds.run(INSERT.into(BusinessPartner).entries({
                    BusinessPartner: result[i].BusinessPartner,
                    BusinessPartnerFullName: result[i].BusinessPartnerFullName,
                    BusinessPartnerGrouping: result[i].BusinessPartnerGrouping
                }));
            }

            const res = await next();
            return res;
    });
});