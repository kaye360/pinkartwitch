import { createClient } from "@sanity/client"

export const client = createClient({
   projectId: "v81020gt", 
   dataset: "production", 
   apiVersion: "2024-03-11",
   useCdn: false, 
})
