from PIL import Image, ImageSequence

def save_as_infinite_loop_gif(input_path, output_path):
    with Image.open(input_path) as im:
        frames = [frame.copy() for frame in ImageSequence.Iterator(im)]
        frames[0].save(
            output_path,
            save_all=True,
            append_images=frames[1:],
            loop=0,  # 設定為無限循環
            duration=im.info.get('duration', 100),  # 保留原本的 duration
            disposal=2  # 可選，避免殘影（有些 GIF 編輯器會這樣設定）
        )

# 使用範例
save_as_infinite_loop_gif('/Users/howard/Desktop/howard-website/public/assets/projects/project2/project2-cover.gif', '/Users/howard/Desktop/howard-website/public/assets/projects/project2/project2-cover.gif')
