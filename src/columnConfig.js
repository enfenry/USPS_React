export const columnConfig = {
    "/applications": {
        title: "Applications",
        uri: "https://sstack.crm.dynamics.com/api/data/v9.1/ss_applications",
        columns: [
            {
                displayName: "Name",
                formatter: x => x.ss_name
            },
            {
                displayName: "ID",
                formatter: x => x.ss_applicationid
            },
            {
                displayName: "Type",
                formatter: x => {
                    switch (x.ss_applicationtype) {
                        case 717800000:
                            return "Address Change";
                        case 717800001:
                            return "Mail Forwarding";
                        case 717800002:
                            return "Package Submission";
                        default:
                            return x.ss_applicationtype;
                    }
                }
            },
            {
                displayName: "Created On",
                formatter: x => x.createdon
            }
        ],
        keyGetter: x => x.ss_applicationid
    },

    "/customers": {
        title: "Customers",
        uri: "https://sstack.crm.dynamics.com/api/data/v9.1/contacts",
        columns: [
            {
                displayName: "Name",
                formatter: x => x.fullname
            },
            {
                displayName: "ID",
                formatter: x => x.contactid
            }
        ],
        keyGetter: x => x.contactid
    }
};