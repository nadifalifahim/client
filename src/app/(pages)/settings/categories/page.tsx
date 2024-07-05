"use client";
import withAuth from "@/components/Authentication/withAuth";
import CategoriesTable from "@/components/Categories/categoriesTable/categoriesTable";
import CategoryForm from "@/components/Categories/categoryForm/categoryForm";
import NavigationMenu from "@/components/navigationMenu/navigationMenu";

const ProjectsPage = () => {
  return (
    <div className="flex w-screen bg-slate-50 dark:bg-slate-900 transition-all duration-200 ease-in delay-100">
      <NavigationMenu />
      <div>
        <div className="flex justify-end mt-5 mr-10">
          <CategoryForm></CategoryForm>
        </div>
        <div>
          <CategoriesTable></CategoriesTable>
        </div>
      </div>
    </div>
  );
};

export default withAuth(ProjectsPage);
