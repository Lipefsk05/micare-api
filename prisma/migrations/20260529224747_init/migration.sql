-- CreateEnum
CREATE TYPE "exam_type" AS ENUM ('GS', 'COOMBS_IND', 'HB_HT', 'GL', 'PLAQ', 'HIV', 'HBSAG', 'VDRL', 'ANTI_HCV', 'TOXOPLASMOSE', 'RUBEOLA', 'CVM', 'ANTI_HBS', 'GLICOSE_J', 'GPD', 'HTLV', 'TSH_T4L', 'EAS', 'UROCULTURA', 'STREP_B', 'PREVENTIVO', 'FERRITINA', 'VITAMINA_D', 'VITAMINA_B12');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "crm" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "phone" TEXT,
    "emergency_phone" TEXT,
    "access_code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prenatal_cards" (
    "id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,
    "doctor_id" TEXT NOT NULL,
    "pnrh" TEXT,
    "pnar_por" TEXT,
    "dum" TIMESTAMP(3),
    "dpp" TIMESTAMP(3),
    "first_usg" TIMESTAMP(3),
    "ig_weeks" INTEGER,
    "gestacoes" INTEGER,
    "partos_cesareos" INTEGER,
    "partos_normais" INTEGER,
    "abortos" INTEGER,
    "hpp" TEXT,
    "hgo" TEXT,
    "hs" TEXT,
    "hf" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prenatal_cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exams" (
    "id" TEXT NOT NULL,
    "card_id" TEXT NOT NULL,
    "type" "exam_type" NOT NULL,
    "result_1" TEXT,
    "date_1" TIMESTAMP(3),
    "result_2" TEXT,
    "date_2" TIMESTAMP(3),
    "result_3" TEXT,
    "date_3" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consultations" (
    "id" TEXT NOT NULL,
    "card_id" TEXT NOT NULL,
    "consult_number" INTEGER NOT NULL,
    "date" TIMESTAMP(3),
    "complaint" TEXT,
    "ss" TEXT,
    "weight" DOUBLE PRECISION,
    "pa" TEXT,
    "ai" TEXT,
    "touch" TEXT,
    "signature" TEXT,
    "return_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "consultations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_crm_key" ON "users"("crm");

-- CreateIndex
CREATE UNIQUE INDEX "patients_cpf_key" ON "patients"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "patients_access_code_key" ON "patients"("access_code");

-- CreateIndex
CREATE UNIQUE INDEX "exams_card_id_type_key" ON "exams"("card_id", "type");

-- CreateIndex
CREATE UNIQUE INDEX "consultations_card_id_consult_number_key" ON "consultations"("card_id", "consult_number");

-- AddForeignKey
ALTER TABLE "prenatal_cards" ADD CONSTRAINT "prenatal_cards_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prenatal_cards" ADD CONSTRAINT "prenatal_cards_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exams" ADD CONSTRAINT "exams_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "prenatal_cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultations" ADD CONSTRAINT "consultations_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "prenatal_cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
