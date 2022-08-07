import {
  deleteIndRecord,
  loadRecord,
  reset,
} from "../../../features/records/recordsSlice";
import { EditRecord } from "../records/EditModal";
import { TrashFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux"; 

export default function RecordItem({ record }) {
  const dispatch = useDispatch();
  const { records, isLoading, isSuccess, message } = useSelector(
    (state) => state.records)
  return (
    <tr>
      <th scope="row">{record.player_id}</th>
      <td className="text-start" id="name">
        {record.name}
      </td>
      <td id="overall">{record.ranking}</td>
      <td className="table-hard" id="hard">
        {record.hard}
      </td>
      <td className="table-clay" id="clay">
        {record.clay}
      </td>
      <td className="table-grass" id="grass">
        {record.grass}
      </td>
      <td id="atp">{record.atp}</td>
      <td id="lactive">{record.last_active}</td>
      <td id="edit">
        <EditRecord props={record} /> &nbsp;
        <a
          href="#"
          onClick={() => {
            dispatch(
              deleteIndRecord({ _id: record._id, doc_date: record.doc_date })
            ); 
          }}
        >
          <TrashFill />
        </a>
      </td>
    </tr>
  );
}
