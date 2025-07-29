// import { useTheme } from "next-themes"
// import { Toaster as Sonner } from "sonner";

// const Toaster = (
 
// ) => {
//   const { theme = "system" } = useTheme()

//   return (
//     <Sonner
//       theme={theme}
//       className="toaster group"
//       style={
//         {
//           "--normal-bg": "var(--popover)",
//           "--normal-text": "#000",
//           "--normal-border": "var(--border)"
//         }
//       }
//        />
//   );
// }

// export { Toaster }
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = () => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      style={{
        "--toast-bg": "hsl(var(--popover))",
        "--toast-text": "hsl(var(--popover-foreground))",
        "--toast-border": "hsl(var(--border))",
        "--toast-icon": "hsl(var(--primary))",
        "--toast-close": "hsl(var(--muted-foreground))",
      }}
      toastOptions={{
        classNames: {
          toast: "border shadow-lg",
          title: "font-semibold",
          description: "text-sm text-muted-foreground",
        },
      }}
    />
  );
};

export { Toaster };
