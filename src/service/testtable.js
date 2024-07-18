import { apiCall } from "@/utils/supa";

const tableName = 'test'

const getAll = async () => {
  const resp = await apiCall
    .from(tableName)
    .select('*')
    // .select("*, pos_vendor(*), brand_config(*)")
    // .order("created_at", { ascending: false });

  return resp;
};

export {
    getAll
}