// Fonction fléchée qui prend un paramètre 'time' (en secondes) et retourne une chaîne formatée en "mm:ss".
const getFormattedValue = (time) => {
    
    // Calculs intermédiaires pour éviter de recalculer plusieurs fois.
    const minutesValue = Math.trunc(time / 60); // Partie entière du temps divisé par 60 (minutes)
    const secondsValue = time % 60;             // Reste de la division par 60 (secondes)

    // Formate les minutes avec un zéro si elles sont inférieures à 10.
    const minutes = minutesValue < 10 ? `0${minutesValue}` : minutesValue;

    // Formate les secondes avec un zéro si elles sont inférieures à 10.
    const secondes = secondsValue < 10 ? `0${secondsValue}` : secondsValue;

    // Retourne la chaîne de caractères formatée sous la forme "mm:ss".
    return `${minutes}:${secondes}`;
};

// Exportation par défaut de la fonction pour pouvoir l'utiliser dans d'autres fichiers/modules.
export default getFormattedValue;