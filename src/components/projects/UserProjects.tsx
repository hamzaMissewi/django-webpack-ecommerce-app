// import axios from 'axios';
import React from 'react';
import {gql, useQuery} from '@apollo/client';
// import {getUserProjectsQuery} from '../../graphql/queries/userProjects';

const getUserProjectsQuery = gql(`
    query GetProjects {
        allProjects {
            id
            title
            description
            url
        }
    }`);

// const GET_LOCATIONS = gql`
//     query GetLocations {
//         locations {
//             id
//             name
//             description
//             photo
//         }
//     }
// `;


export default function ProjectList() {
    const {loading, error, data} = useQuery(getUserProjectsQuery);

    // MUST GENERATE TYPES.ts
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // const fetchProjects = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:8000/api/projects/');
    //         console.log(response.data);
    //     } catch (error) {
    //         console.error("Error fetching projects:", error);
    //     }
    // };


    return (
        <div>
            <h1>Graphql projects of user for portfolio</h1>
            {data.map((project: { name: string }) => (
                <div>{project.name}</div>
            ))}
        </div>
    )
}