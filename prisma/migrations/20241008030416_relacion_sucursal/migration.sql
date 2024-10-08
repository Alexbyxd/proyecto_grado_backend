-- DropForeignKey
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_id_sucursal_fkey";

-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "id_sucursal" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_id_sucursal_fkey" FOREIGN KEY ("id_sucursal") REFERENCES "Sucursal"("id_sucursal") ON DELETE SET NULL ON UPDATE CASCADE;
