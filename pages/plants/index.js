
import { Space, Button, message } from "antd"
import useSWR, { mutate } from 'swr';
import Link from 'next/link';

const fetcher = async (...args) => {
    const res = await fetch(...args);
    return res.json();
};
export default function Index({ language, collapsed, ...props }) {

    async function deletePlant(id) {
        const plantId = {
            plantId: id
        };
        const res = await fetch('/api/plants/delete', { method: 'POST', body: JSON.stringify(plantId) })
        if (res.status === 200) {
            message.success("the plant was deleted");
            mutate('/api/plants');

        }
    };

    const { data, error } = useSWR(`/api/plants`, fetcher);
    if (error) {
        return 'failed to load'
    }
    if (!data) {
        return 'Loading...';
    }

    const { plants } = data;



    return (
        <div>

            <Space direction="vertical">
                <Link href="/plants/create">Go to Create!</Link>
                {plants.map((plant) => {
                    switch (language) {
                        case "en":
                            return <div>
                                <Space>
                                    <div>{plant.nameEn}</div>
                                    <Button onClick={() => deletePlant(plant.id)}>delete</Button>
                                </Space>
                            </div>
                        case "ru":
                            return <div><Space><div>{plant.nameRu}</div> <Button onClick={() => deletePlant(plant.id)}>удалить</Button></Space></div>
                        case "kr":
                            return <div><Space><div>{plant.nameKr}</div> <Button onClick={() => deletePlant(plant.id)}>삭제</Button></Space></div>
                        default:
                            return "default"
                    }
                })}</Space>
        </div>
    );
}