import sys
import os
import glob
import json
import fiona

def convert_gpkg_to_json(directory):
    #Encontra todos os arquivos .gpkg no diretório
    gpkg_files = glob.glob(os.path.join(directory, '*.gpkg'))
    if not gpkg_files:
        print("Nenhum arquivo .gpkg encontrado no diretório.")
        return
    
    #Define o nome do arquivo .json
    for gpkg_file in gpkg_files:
        base_name = os.path.splitext(os.path.basename(gpkg_file))[0]
        json_filename = os.path.join(directory, f"{base_name}.json")
        print(f"Processando '{gpkg_file}'...")

        #Extrai as features do arquivo .gpkg e salva em um arquivo .json
        with fiona.open(gpkg_file, 'r') as src:
            features = [feature.__geo_interface__ for feature in src]
            geojson = {
                "type": "FeatureCollection",
                "features": features
            }
            with open(json_filename, 'w', encoding='utf-8') as f:
                json.dump(geojson, f, ensure_ascii=False, indent=4)
        print(f"Arquivo '{json_filename}' criado com sucesso.")

def main():
    if len(sys.argv) != 2:
        print("Uso: python convert.py <diretorio>")
        sys.exit(1)

    directory = sys.argv[1]

    if not os.path.isdir(directory):
        print(f"Diretório '{directory}' não encontrado.")
        sys.exit(1)

    convert_gpkg_to_json(directory)
    print("Conversão finalizada.")

if __name__ == "__main__":
    main()
