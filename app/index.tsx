import { router } from "expo-router";
import { useEffect, useState } from "react";

export default function IndexApp() {
    const [loaded, setLoaded] = useState(false);
    useEffect(()=>{
        if(loaded){
            //para validar si ya tiene la sesion activa
            //router.replace("/home")

            //llevarlo al login si no tiene sesion o para que se registre
            router.replace("/(tabs)/excursion")
        }
    }, [loaded])

    //al cargar, nos lleva al login

    useEffect(() => {
        setLoaded(true);
    }, []);
}