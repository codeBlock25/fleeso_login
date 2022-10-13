import { useState } from "react";
import { Link } from "react-router-dom";
import {
  TextField,
  Autocomplete,
  Stack,
  Chip,
  Button,
  useMediaQuery,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import skills from "../../assets/data/skills.json";
import { Close } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

const options: { title: string }[] = [
  { title: "Projects" },
  { title: "Designs" },
];

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<typeof skills[0][]>([]);
  const [option, setOption] = useState(options[0]);
  const tabletMode = useMediaQuery("(min-width:800px)");
  return (
    <>
      <section className="AuthPage">
        <AnimatePresence key="left_container" mode={"wait"} initial={false}>
          {tabletMode && (
            <motion.div
              className="container"
              key="left_container"
              initial={{ x: -500 }}
              animate={{ x: 0 }}
              exit={{ x: -500 }}
              transition={{
                duration: 0.4,
              }}
            >
              <h2 className="logo">Fleeso</h2>
              <div className="content">
                <h3 className="txt main">Start your journey with us.</h3>
                <p className="txt">
                  Discover the world's best community of freelancers and
                  business owners.
                </p>
              </div>
              <div className="carousel">
                <div className="carousel_content">
                  <p className="txt">
                    Simply unbelievable! I am really satisfied with my projects
                    and business. This is Absolute wonderful.
                  </p>
                  <div className="user_details">
                    <span
                      className="user_img"
                      role="img"
                      style={{
                        backgroundImage: "url('/assets/images/pic1.jpg')",
                      }}
                    />
                    <div className="user_info">
                      <p className="user_name">Daniel Amos</p>
                      <p className="user_job_title">Freelancer</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="container_form"
          key={"right_container"}
          animate={tabletMode ? {} : { left: 0 }}
          transition={{
            duration: 0.4,
          }}
        >
          <h2 className="title">Sign Up</h2>
          <p className="txt">
            Have a account?
            <Link to="/auth/login">Login</Link>
          </p>
          <div className="content">
            <p>Looking for?</p>
            <div className="options">
              {options.map((opt) => {
                return (
                  <motion.div
                    className={`opt ${
                      option.title === opt.title ? "active" : ""
                    }`}
                    style={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                    whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}
                    key={opt.title}
                    onClick={() => {
                      setOption(opt);
                    }}
                  >
                    <span
                      className={`radio ${
                        option.title === opt.title ? "active" : ""
                      }`}
                    />
                    {opt.title}
                  </motion.div>
                );
              })}
            </div>
          </div>
          <form>
            <div className="inputBox">
              <label htmlFor="email">Email</label>

              <TextField
                InputProps={{ id: "email" }}
                type="email"
                placeholder="Enter your email"
                required
                className="inputField"
                value={email}
                onChange={({ target: { value } }) => setEmail(value)}
              />
            </div>
            <div className="inputBox">
              <label htmlFor="password">Password</label>

              <TextField
                InputProps={{ id: "password" }}
                type="password"
                placeholder="Enter your password"
                required
                className="inputField"
                value={password}
                onChange={({ target: { value } }) => setPassword(value)}
              />
            </div>
            <div className="inputBox">
              <label htmlFor="skills">Select Skills</label>
              <Autocomplete
                disablePortal
                id="skills_input"
                options={skills.filter((skill) => skill.name.length > 2)}
                getOptionLabel={(option) => option.name}
                multiple
                groupBy={(option) => option.categoryName}
                clearOnEscape
                value={selectedSkills}
                getOptionDisabled={(option) =>
                  selectedSkills.filter((sSkill) => option.name === sSkill.name)
                    .length > 0
                }
                renderOption={(props, option, { selected }) => (
                  <ListItemButton key={option.name} {...(props as any[])}>
                    <ListItemText primary={option.name} />
                  </ListItemButton>
                )}
                renderTags={() => <></>}
                onChange={(_: any, newValue: typeof skills[0][] | null) => {
                  if (newValue) {
                    setSelectedSkills(newValue);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className="inputField autoComplete"
                    placeholder="Type to search..."
                  />
                )}
              />
            </div>
            {selectedSkills.length >= 1 && (
              <Stack
                key={"skill_stack"}
                component={motion.div}
                initial={{
                  position: "absolute",
                  bottom: "70px",
                  opacity: 0,
                  y: -10,
                }}
                animate={{
                  position: "absolute",
                  bottom: "70px",
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  position: "absolute",
                  bottom: "70px",
                  opacity: 0,
                  y: -10,
                }}
                transition={{
                  duration: 0.4,
                }}
                className={"stack_row"}
                direction="row"
                mt={4}
                spacing={1}
              >
                {selectedSkills.map((skill, index) => (
                  <AnimatePresence
                    mode={"wait"}
                    key={skill.name + index.toString()}
                  >
                    <Chip
                      label={skill.name}
                      key={skill.name + index.toString()}
                      component={motion.div}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      variant="filled"
                      className="inputChip"
                      deleteIcon={<Close />}
                      onDelete={() => {
                        setSelectedSkills((prev_) =>
                          prev_.filter((prev) => skill.name !== prev.name)
                        );
                      }}
                    />
                  </AnimatePresence>
                ))}
              </Stack>
            )}
            <Button
              component={motion.button}
              animate={
                selectedSkills.length >= 1
                  ? { marginTop: "80px" }
                  : { marginTop: "20px" }
              }
              className="btn"
            >
              Create Account
            </Button>
          </form>
        </motion.div>
      </section>
    </>
  );
};
