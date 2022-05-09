const games = [
    '#this_war_of_mine',
    '#оборотень',
    '#немезида',
    '#ужас_аркхема',
    '#взрывные_котята',
    '#Нечто',
    '#Цитадели',
    '#Pixel_tatctics',
    '#крылья',
    '#властелин_колец',
    '#Tiny_Epic_Quest',
    '#Tiny_Epic_Zombies',
    '#Mars',
    '#Avalon',
    '#Таверна_Красный_дракон',
    '#Манчкин',
    '#Имаджинариум',
    '#кошмариум',
    '#зельеварение',
    '#seasons',
    '#magic_the_gathering',
    '#манчкин',
    '#страдающее_средневековье',
    '#бэнг',
    '#uno',
    '#ticket_to_ride',
    '#code_names',
    '#pictionary',
    '#нуар',
    '#code_names',
    '#темный_властелин',
    '#uno',
    '#переворот',
    '#взрывные_котята',
    '#бенг',
    '#манчкин',
    '#цитадели'
];

const events = Array.from(Array(100).keys()).map((value) => {
    const start = (new Date);
    start.setDate(Math.floor(Math.random() * 29));
    start.setHours(Math.floor(Math.random() * 8) + 15);
    start.setMinutes(0);

    const end = structuredClone(start);
    end.setHours(end.getHours() + 1);

    return {
        "id": value,
        "title": games[Math.floor(Math.random() * games.length)],
        "allDay": false,
        "start": start,
        "end": end
    };
});

function fetchEvents({ start, end }) {
    return events;
}

export default fetchEvents;
