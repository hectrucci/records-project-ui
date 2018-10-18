import axios from 'axios';

const apiUrl = process.env.apiUrl;
const RecordService = {};

RecordService.getRecords = (page = 1, size = 5) => (
    axios({
        method: 'get',
        url: `${apiUrl}/records?page=${page}&size=${size}`,
        headers: {
            'Content-Type': 'application/json',
        },
    })
);

RecordService.createNewRecord = ({ name, favoriteColor }) => (
    axios({
        method: 'post',
        url: `${apiUrl}/records/`,
        data: {
            name,
            favoriteColor,
        },
    })
);

RecordService.deleteRecord = id => (
    axios({
        method: 'delete',
        url: `${apiUrl}/records/${id}`,
    })
);

export default RecordService;
