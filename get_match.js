import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBhREGVAE9ReZPWPfWdt30rAzjEGe_UrsM",
    projectId: "results-9212d",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function run() {
    const snap = await getDocs(collection(db, "segundaFase"));
    let matchId = null;
    snap.forEach(doc => {
        const data = doc.data();
        if ((data.local === "Argentina" && data.visitante === "Jordan") || (data.local === "Jordan" && data.visitante === "Argentina")) {
            console.log("Found match:", doc.id, data);
            matchId = doc.id;
        }
    });

    if (matchId) {
        const predId = `julian_${matchId}`;
        console.log("Will delete prediction:", predId);
        await deleteDoc(doc(db, "predicciones", predId));
        console.log("Prediction deleted successfully.");
        
        // Also check if 'Julian' with capital J exists, because names are case sensitive
        const predId2 = `Julian_${matchId}`;
        await deleteDoc(doc(db, "predicciones", predId2));
        console.log("Prediction deleted successfully (capital J).");
        
    } else {
        console.log("Match not found");
    }
    process.exit(0);
}

run();
