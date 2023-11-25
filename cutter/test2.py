from PIL import Image

# Создаем новое изображение
image = Image.new('RGB', (80, 80), color='white')

# Сохраняем изображение в файл
image.save('white_image.jpg')
