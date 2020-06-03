
import { Button } from 'antd';
import useSWR from 'swr';

const fetcher = async (...args) => {
    const res = await fetch(...args);
    return res.json();
};
export default function Index({ language, collapsed, ...props }) {

    const { data, error } = useSWR(`/api/plants`, fetcher);
    if (error) {
        return 'failed to load'
    }
    if (!data) {
        return 'Loading...';
    }



    return (
        <div>
            <div>{data.plants.map((plant) => {
                switch (language) {
                    case "en":
                        return <div>{plant.nameEn}</div>
                    case "ru":
                        return <div>{plant.nameRu}</div>
                    case "kr":
                        return <div>{plant.nameKr}</div>
                    default:
                        return "default"
                }
            })}</div>
        </div>
    );
}