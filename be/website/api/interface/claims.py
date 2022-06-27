def create_batch():
    return None;


def load_billable_claims(batch_number):
    return {
        "headers": ["claimid", "accession", "dos", "patient_firstname", "patient_lastname"],
        "claims": [
                      ["5/4/22", "4/28/93", "Rana A.", "80240/U0003", "Z23.0", "Allen B.(48)", "Self", "FA",
                       "UHC", "8/4/22", "No", "0.00", "100.00", "100.00", "95.00", "Yes", "Ok"],
                      ["5/4/22", "4/28/93", "Rana A.", "90010", "Z23.0", "Allen B.(48)", "Self", "FA",
                       "UHC", "8/4/22", "No", "0.00", "100.00", "100.00", "95.00", "Yes", "Ok"],
                      ["5/4/22", "4/28/93", "Rana A.", "80240", "Z23.0", "Allen B.(48)", "Self", "FA",
                       "UHC", "8/4/22", "No", "0.00", "100.00", "100.00", "95.00", "Yes", "Ok"],
                      ["5/4/22", "4/28/93", "Rana A.", "80240", "Z23.0", "Allen B.(48)", "Self", "FA",
                       "UHC", "8/4/22", "No", "0.00", "100.00", "100.00", "95.00", "Yes", "Ok"],
                  ]
    }

def load_claim(claimid):
    return {
        "charges" : [1,2,3],
        "patient" : {
            "firstname" : "X",
            "lastname": "Y",
            "insurance_plans" : [1,2]
        },
        "physician": {
            "firstname" : "X",
            "last_name" : "Y",
            "npi"  : "1224242"
        },
        "history": [
            1,2,3
        ]
    }