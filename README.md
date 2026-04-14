# 🏥 DiabetAI — Prédiction de la Réadmission Hospitalière

<div align="center">

![Python](https://img.shields.io/badge/Python-3.10+-blue?logo=python&logoColor=white)
![Scikit-learn](https://img.shields.io/badge/Scikit--learn-1.x-orange?logo=scikit-learn&logoColor=white)
![Google Colab](https://img.shields.io/badge/Google%20Colab-F9AB00?logo=googlecolab&logoColor=black)
![HTML5](https://img.shields.io/badge/Web%20App-HTML%2FJS-E34F26?logo=html5&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

**Prédiction de la réadmission hospitalière en moins de 30 jours chez les patients diabétiques**  
*Modèle Random Forest · Accuracy 88.9% · 101 766 patients · 130 hôpitaux américains*

[🔬 Ouvrir dans Colab](https://colab.research.google.com/github/votre-username/diabetai/blob/main/Version_final.ipynb) · [🌐 Démo Web]([https://votre-username](https://github.com/oumayma-bayar/projetML.git.io/DashBoard) · [📊 Dataset UCI](https://archive.ics.uci.edu/ml/datasets/diabetes+130-us+hospitals+for+years+1999-2008)

</div>

---

## 👥 Auteurs

| Nom |
|-----|
| **Manar Lahouel** 
| **Oumayma Bayar** 

> Projet réalisé à **Polytec Sousse** dans le cadre d'un cours de Machine Learning.

---

## 📋 Description du Dataset

Le dataset **Diabetes 130-US Hospitals (1999–2008)** est disponible sur le [UCI Machine Learning Repository](https://archive.ics.uci.edu/ml/datasets/diabetes+130-us+hospitals+for+years+1999-2008).

| Caractéristique | Valeur |
|----------------|--------|
| Observations | 101 766 rencontres hospitalières |
| Variables initiales | 50 colonnes |
| Période | 1999 – 2008 |
| Source | 130 hôpitaux américains |
| Variable cible | `readmitted` : `<30` / `>30` / `NO` |

**Principales variables :** données démographiques (âge, genre, race), cliniques (durée séjour, diagnostics, médicaments, procédures) et traitements antidiabétiques (insuline, metformine, glipizide...).

---

## ❓ Problématique

> **Peut-on prédire si un patient diabétique sera réadmis à l'hôpital en moins de 30 jours ?**

La réadmission précoce est un indicateur critique de qualité des soins et génère des coûts hospitaliers élevés. Ce projet construit un **modèle de classification binaire** :

- `1` → Réadmis en moins de 30 jours *(cas critique)*
- `0` → Non réadmis ou réadmis après 30 jours

---

## 🗂️ Structure du projet

```
diabetai/
│
├── Version_final.ipynb        # Notebook principal Google Colab (14 étapes)
├── web/
│   └── index.html             # Application web de déploiement
│
├── diabetic_data.csv          # Dataset principal (à télécharger depuis UCI)
├── IDS_mapping.csv            # Mapping des identifiants
│
├── model_readmission.pkl      # Modèle sauvegardé (généré après exécution)
├── encoders_readmission.pkl   # Encodeurs LabelEncoder
├── feature_cols.pkl           # Liste des features
│──evaluation_dashboard.png
└── README.md
```

---

## ⚙️ Installation & Utilisation

### Sur Google Colab (recommandé)

1. Cliquez sur le badge **Open in Colab** ci-dessus
2. Chargez vos données via Google Drive ou upload direct :

```python
# Option A — Google Drive
from google.colab import drive
drive.mount('/content/drive')
df = pd.read_csv('/content/drive/home/diabetic_data.csv')

# Option B — Upload direct
from google.colab import files
uploaded = files.upload()
```

3. Exécutez toutes les cellules : **Exécution → Tout exécuter** (`Ctrl+F9`)

### En local

```bash
git clone https://github.com/oumayma-bayar/projetML.git
cd diabetai
pip install pandas numpy scikit-learn matplotlib seaborn joblib
jupyter notebook Version_final.ipynb
```

### Application web

Ouvrez directement `web/index.html` dans un navigateur, ou déployez sur GitHub Pages.

---

## 🔬 Pipeline ML (14 étapes)

```
Étape  1 — Configuration & imports
Étape  2 — Chargement des données (CSV)
Étape  3 — Exploration EDA (distribution, corrélations)
Étape  4 — Nettoyage (NaN, colonnes inutiles)
Étape  5 — Binarisation de la variable cible
Étape  6 — Encodage LabelEncoder (31 variables)
Étape  7 — Train / Test split 80/20 stratifié
Étape  8 — Pipeline StandardScaler + Random Forest
Étape  9 — Comparaison de 3 modèles
Étape 10 — Évaluation complète + Dashboard Matplotlib
Étape 11 — Sauvegarde joblib (.pkl)
Étape 12 — Fonction predict_patient()
Étape 13 — Dashboard interactif HTML (4 onglets)
Étape 14 — Test batch sur 10 patients
```

---

## 📊 Résultats

### Préprocessing

- 7 colonnes supprimées (taux NaN > 50% ou identifiants inutiles)
- Imputation médiane (numérique) et mode (catégoriel)
- Dimensions finales : **101 766 × 43**

### Déséquilibre des classes

| Classe | Effectif | Pourcentage |
|--------|----------|-------------|
| Non réadmis < 30j (0) | 90 409 | **88.84%** |
| Réadmis < 30j (1) | 11 357 | **11.16%** |

### Comparaison des modèles

| Modèle | Accuracy Train | Accuracy Test | Temps |
|--------|---------------|--------------|-------|
| **Random Forest** ✅ | 100.00% | **88.92%** | 7.8s |
| Logistic Regression | 88.82% | 88.83% | 0.2s |
| KNN (k=5) | 89.43% | 88.18% | 0.1s |

### Top 5 features (Random Forest)

| Rang | Feature | Importance |
|------|---------|-----------|
| 1 | `num_lab_procedures` | 9.17% |
| 2 | `diag_1` | 8.97% |
| 3 | `diag_2` | 8.91% |
| 4 | `diag_3` | 8.85% |
| 5 | `num_medications` | 7.81% |

---

## 🌐 Déploiement Web

L'application `web/index.html` est une interface **100% HTML/CSS/JS** (sans backend) qui permet de :

- Visualiser les métriques et résultats du modèle
- Simuler une prédiction en temps réel en saisissant les données d'un patient
- Consulter l'historique des prédictions de la session
- Explorer le pipeline et l'importance des features

### Déploiement GitHub Pages

```bash
# Dans les paramètres GitHub du repo :
# Settings → Pages → Source : Deploy from a branch
# Branch : main  /  Folder : /web
```

---

## 🧪 Utilisation de la fonction `predict_patient()`

```python
result = predict_patient({
    'race'               : 'Caucasian',
    'gender'             : 'Male',
    'age'                : '[70-80)',
    'time_in_hospital'   : 10,
    'num_lab_procedures' : 80,
    'num_medications'    : 25,
    'number_inpatient'   : 3,
    'number_diagnoses'   : 12,
    'insulin'            : 'Up',
    'metformin'          : 'No',
    'change'             : 'Ch',
    'diabetesMed'        : 'Yes',
    'diag_1'             : '250',
    'diag_2'             : '428',
    'diag_3'             : '276',
})

# Résultat :
# {
#   'prediction'        : 0,
#   'proba_readmission' : 0.3759,
#   'proba_non_readmis' : 0.6241,
#   'risque'            : '🟡 RISQUE MODÉRÉ'
# }
```

---

## ⚠️ Limites & Améliorations

- Le **recall sur la classe positive** (réadmis < 30j) est faible (~1%) à cause du fort déséquilibre des classes
- **Pistes d'amélioration :**
  - Rééquilibrage avec `SMOTE` (imbalanced-learn)
  - Ajustement du seuil de décision (`predict_proba > 0.3`)
  - Exploration de `XGBoost` ou `LightGBM`
  - Déploiement API REST avec `FastAPI` + `uvicorn`

---

## 📄 Licence

Ce projet est distribué sous licence **MIT**. Les données proviennent du UCI Machine Learning Repository.

---

<div align="center">
<sub>Polytec Sousse · Manar Lahouel & Oumayma Bayar · 2025</sub>
</div>
