from PIL import Image
import os

def crop_and_save(image_path, output_folder, crop_size):
    # Открываем изображение
    img = Image.open(image_path)

    # Получаем размеры изображения
    width, height = img.size

    # Переменные для хранения координат области, которую мы будем вырезать
    left, top, right, bottom = 0, 0, crop_size, crop_size

    # Создаем папку для сохранения фрагментов, если её еще нет
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Перебираем все возможные фрагменты и сохраняем их в отдельные файлы
    num=1
    while right <= width:
        while bottom <= height:
            # Вырезаем фрагмент
            cropped_img = img.crop((left, top, right, bottom))

            # Составляем имя файла для сохранения (например, "fragment_0_0.jpg")
            filename = f"{num}.jpg"
            num+=1

            # Сохраняем фрагмент
            cropped_img.save(os.path.join(output_folder, filename))

            # Переходим к следующей вертикальной области
            top = bottom
            bottom += crop_size

        # Переходим к следующей горизонтальной области
        left = right
        right += crop_size

        # Сбрасываем вертикальные координаты
        top, bottom = 0, crop_size

# Пример использования функции
image_path = "D:\\v.orlov\\Project\\MyProject\\Ade\\MothersDay\\cutter\\q.png"
output_folder = "D:\\v.orlov\\Project\\MyProject\\Ade\\MothersDay\\cutter"
crop_size = 80

crop_and_save(image_path, output_folder, crop_size)