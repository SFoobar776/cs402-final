import * as FileSystem from 'expo-file-system';

const filePath = FileSystem.documentDirectory + '/save_data';

// dummy object
const dummyObject = {
    key: 1,
    title: "Dentist Appt",
    description: "Will be painful",
    date: new Date(),
    done: false,
    selected: false,
    location: {
        lat: 0,
        lng: 0,
    },
};

// export async function load() {
//     let returnData=[dummyObject];
//     await FileSystem.readAsStringAsync(filePath).then((data) => {
//         returnData = JSON.parse(data);
//     }, (e) => {
//         console.log("An error occured in load(). This is expected when loading for the first time.",e);
//     });
//     return returnData;
// }
export async function load() {
    try {
        const data = await FileSystem.readAsStringAsync(filePath);
        return JSON.parse(data);
    } catch (error) {
        console.log("An error occurred in load(). This is expected when loading for the first time.", error);
        return [];
    }
}

export async function save(data) {
    await FileSystem.writeAsStringAsync(filePath, JSON.stringify(data));
}


