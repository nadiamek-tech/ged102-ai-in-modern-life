# Narration tools (Kokoro TTS)

Pre-generates natural narration for every scene, so **Listen** plays a recorded voice instead of the browser's speech.

- Engine: [kokoro-onnx](https://github.com/thewh1teagle/kokoro-onnx) (Apache 2.0), model `kokoro-v1.0.int8.onnx` + `voices-v1.0.bin` from its GitHub release `model-files-v1.0`. Voice: `af_heart`.
- Install: `pip install kokoro-onnx soundfile` (plus ffmpeg).

Steps (paths inside the scripts point to the build folders; adjust per course):
1. `extract.mjs`: serve the site locally, then click through every scene and save each paragraph's text to `narration.json`. Tables are skipped; this matches the player.
2. `gen.py narration.json <site>/audio`: one MP3 per paragraph, `audio/<page>/sNN-pP-<hash>.mp3` (48 kbps mono). Resumable: existing files are skipped. `normtext.py` cleans symbols (→, ≈, AED, %) for speech.
3. `publish.py [push]`: writes `audio/manifest.json` (only pages whose clips are all present), copies them to the repo and commits/pushes.

The player in `assets/course.js` loads `audio/manifest.json`. A scene uses recordings only if its clip count matches its paragraphs; otherwise it falls back to browser speech. If you edit a scene's text, re-run all three steps: the hash in the filename changes, so only the edited paragraphs are regenerated.
