import json

jlpt_kanjis = {}

with open("data/kanji.json") as f:
    kanji_data = json.loads(f.read())

    for x in kanji_data:
        if kanji_data[x]["jlpt_new"] != None:
            jlpt_kanjis[x] = kanji_data[x]

with open("data/kanji-jlpt.json", "w") as f:
    f.write(json.dumps(jlpt_kanjis, ensure_ascii=False))
