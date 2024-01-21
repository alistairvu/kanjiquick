import flask
import json
import random
from flask_frozen import Freezer


app = flask.Flask(__name__)
freezer = Freezer(app)


@app.route("/")
def index():
    with open("data/kanji-jouyou.json") as f:
        raw_kanjis = json.loads(f.read())

    kanjis = [{"character": x, **raw_kanjis[x]} for x in raw_kanjis]
    random.shuffle(kanjis)

    return flask.render_template(
        "pages/index.jinja",
        kanjis=json.dumps(kanjis, ensure_ascii=False),
        test_type="jouyou",
    )


@app.route("/wk/")
def wk():
    with open("data/kanji-wanikani.json") as f:
        raw_kanjis = json.loads(f.read())

    kanjis = [{"character": x, **raw_kanjis[x]} for x in raw_kanjis]
    random.shuffle(kanjis)

    return flask.render_template(
        "pages/index.jinja",
        kanjis=json.dumps(kanjis, ensure_ascii=False),
        test_type="wk",
    )


@app.route("/jlpt/")
def jlpt():
    with open("data/kanji-jlpt.json") as f:
        raw_kanjis = json.loads(f.read())

    kanjis = [{"character": x, **raw_kanjis[x]} for x in raw_kanjis]
    random.shuffle(kanjis)

    return flask.render_template(
        "pages/index.jinja",
        kanjis=json.dumps(kanjis, ensure_ascii=False),
        test_type="jlpt",
    )


if __name__ == "__main__":
    freezer.run(debug=True)
