import { profileTemplateSchema } from "@/schemas/app-profile-schemas";
import { apiGetTemplateService } from "@/service/api-service";
import { ApiGetTemplateResponse } from "@/types/api-response";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface TemplateError {
  isError: boolean;
  cause: null | string;
}

export const useUserTemplate = () => {
  const [template, setTemplate] = useState<null | ApiGetTemplateResponse>(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<TemplateError>({
    isError: false,
    cause: null,
  });

  const { templateId } = useParams();

  useEffect(() => {
    if (!templateId) return;

    const getUserTemplate = async () => {
      const schemaRes = profileTemplateSchema.safeParse(templateId);
      if (schemaRes.error || !schemaRes.success) {
        setIsPending(false);
        setError({
          isError: true,
          cause: "This profile hasn't been verified yet",
        });

        return;
      }

      const response = await apiGetTemplateService(schemaRes.data);
      if (response.error.isError || !response.data) {
        const errorStatus = response.error.status;
        const message =
          errorStatus < 500
            ? "This profile hasn't been verified yet"
            : "We have some problems. Please try again later";

        setError({ isError: true, cause: message });
        setIsPending(false);
        return;
      }

      const resData = response.data;
      setTemplate({
        profile_email: resData.profile_email,
        profile_image: resData.profile_image,
        profile_last_name: resData.profile_last_name,
        profile_links: resData.profile_links,
        profile_name: resData.profile_name,
        profile_template: resData.profile_template,
        template_bg: resData.template_bg,
        theme: resData.theme,
      });

      setIsPending(false);
    };

    getUserTemplate();
  }, [templateId]);

  return { template, isPending, error };
};
